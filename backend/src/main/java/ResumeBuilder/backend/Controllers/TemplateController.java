package ResumeBuilder.backend.Controllers;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ResumeBuilder.backend.Logic.TemplateLogic;
import ResumeBuilder.backend.Models.ApiModels.Template.AddTemplateModel;
import ResumeBuilder.backend.Models.ApiModels.Template.HideSectionModel;
import ResumeBuilder.backend.Models.ApiModels.Template.InitializeTemplateModel;
import ResumeBuilder.backend.Models.ApiModels.Template.ModifyTemplateModel;
import ResumeBuilder.backend.Models.ApiModels.Template.SwapMultipleSectionsModel;
import ResumeBuilder.backend.Models.ApiModels.Template.UnhideSectionModel;
import ResumeBuilder.backend.Models.AuthenticationModels.AuthenticationPrincipalModel;
import ResumeBuilder.backend.Models.DatabaseModels.LineModel;
import ResumeBuilder.backend.Models.DatabaseModels.TemplateModel;
import ResumeBuilder.backend.Models.DatabaseModels.UserAccountModel;
import ResumeBuilder.backend.Models.DatabaseModels.UserInfoModel;
import ResumeBuilder.backend.Repositories.TemplateRepository;
import ResumeBuilder.backend.Repositories.UserAccountRepository;
import ResumeBuilder.backend.Utilities.TemplateCacheUtility;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;

@RestController
@RequestMapping("/api/template")
public class TemplateController {
    private final TemplateLogic _templateLogic;
    private final TemplateCacheUtility _templateCacheUtility;
    private final TemplateRepository _templateRepository;
    private final UserAccountRepository _userAccountRepository;

    public TemplateController(TemplateLogic templateLogic, TemplateCacheUtility templateCacheUtility,
            TemplateRepository templateRepository,
            UserAccountRepository userAccountRepository) {
        _templateLogic = templateLogic;
        _templateCacheUtility = templateCacheUtility;
        _templateRepository = templateRepository;
        _userAccountRepository = userAccountRepository;

    }

    // Add a latex template to the database
    @PostMapping("/add")
    public ResponseEntity<Void> add(@RequestBody AddTemplateModel addTemplateModel, Authentication authentication) {
        try {
            if (authentication == null) {
                return ResponseEntity.status(403).build();
            }
            AuthenticationPrincipalModel authenticationPrincipalModel = (AuthenticationPrincipalModel) authentication
                    .getPrincipal();
            if (authenticationPrincipalModel.isSession) {
                return ResponseEntity.status(403).build();
            }
            UserAccountModel userAccountModel = _userAccountRepository
                    .findByUsername(authenticationPrincipalModel.identity).get();
            if (!userAccountModel.admin) {
                return ResponseEntity.status(403).build();
            }

            Path path = Paths.get("./backend/assets/templates/" + addTemplateModel.name + ".tex");
            ArrayList<LineModel> lines = new ArrayList<>();
            String line;
            BufferedReader reader = Files.newBufferedReader(path);
            while ((line = reader.readLine()) != null) {
                LineModel lineModel = new LineModel(line);
                lines.add(lineModel);
            }
            reader.close();
            String session = UUID.randomUUID().toString();
            _templateCacheUtility.put(session, lines);

            ModifyTemplateModel modifyTemplateModel = new ModifyTemplateModel();
            modifyTemplateModel.session = session;
            modifyTemplateModel.userInfoModel = userAccountModel.userInfoModel;
            byte[] pdf = compile(modifyTemplateModel).getBody();

            PDDocument document = Loader.loadPDF(pdf);
            PDFRenderer renderer = new PDFRenderer(document);
            BufferedImage image = renderer.renderImage(0);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            byte[] png = baos.toByteArray();

            TemplateModel templateModel = new TemplateModel();
            templateModel.name = addTemplateModel.name;
            templateModel.preview = png;

            _templateRepository.save(templateModel);
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Get all templates
    @GetMapping("/get-all")
    public ResponseEntity<List<TemplateModel>> getAll() {
        try {
            List<TemplateModel> templates = _templateRepository.findAll();
            return ResponseEntity.ok().body(templates);
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Initialize a template session
    @PostMapping("/initialize")
    public ResponseEntity<Map<String, String>> initialize(
            @RequestBody InitializeTemplateModel initializeTemplateModel) {
        try {
            ArrayList<LineModel> lines = new ArrayList<>();
            String line;

            String session = UUID.randomUUID().toString();
            boolean success = false;
            for (int attempts = 0; attempts < 3; attempts++) {
                success = _templateCacheUtility.putIfAbsent(session, lines);
                if (success) {
                    break;
                }
                session = UUID.randomUUID().toString();
            }

            if (!success) {
                return ResponseEntity.status(500).build();
            }

            Path path = Paths.get("./backend/assets/templates/" + initializeTemplateModel.name + ".tex");
            BufferedReader reader = Files.newBufferedReader(path);

            while ((line = reader.readLine()) != null) {
                LineModel lineModel = new LineModel(line);
                lines.add(lineModel);
            }

            reader.close();

            _templateCacheUtility.put(session, lines);
            return ResponseEntity.ok().body(Map.of("session", session));
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Compile a template given user info and an existing template session
    @PostMapping("/compile")
    public ResponseEntity<byte[]> compile(@RequestBody ModifyTemplateModel modifyTemplateModel) {
        try {
            ArrayList<LineModel> lines = _templateCacheUtility.get(modifyTemplateModel.session);
            if (lines == null) {
                return ResponseEntity.status(401).build();
            }

            ArrayList<UserInfoModel> userModels = new ArrayList<>();
            userModels.add(modifyTemplateModel.userInfoModel);

            Path standard = Paths.get("./backend/assets/outputs/" + modifyTemplateModel.session);
            Path base = Paths.get("./backend/assets/outputs/" + modifyTemplateModel.session);

            int offset = 0;
            BufferedWriter writer;
            while (true) {
                try {
                    writer = Files.newBufferedWriter(Paths.get(base + ".tex"), StandardOpenOption.CREATE_NEW);
                    break;
                } catch (Exception error) {
                    base = Paths.get(standard + Integer.toString(offset));
                    offset += 1;
                }
            }

            _templateLogic.solve(lines, userModels, 0, writer);
            writer.close();

            String formattedBase = base.toString().replace("\\", "/");
            ProcessBuilder builder = new ProcessBuilder("pdflatex", "--output-directory=./backend/assets/outputs",
                    "-interaction=nonstopmode", formattedBase + ".tex");

            builder.redirectOutput(ProcessBuilder.Redirect.DISCARD);
            builder.redirectError(ProcessBuilder.Redirect.DISCARD);

            Process process = builder.start();
            process.waitFor();

            Path pdfPath = Paths.get(base + ".pdf");
            byte[] pdfBytes = Files.readAllBytes(pdfPath);

            Files.deleteIfExists(Paths.get(base + ".tex"));
            Files.deleteIfExists(Paths.get(base + ".out"));
            Files.deleteIfExists(Paths.get(base + ".log"));
            Files.deleteIfExists(Paths.get(base + ".aux"));
            Files.deleteIfExists(Paths.get(base + ".pdf"));

            return ResponseEntity.ok().body(pdfBytes);
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Hide a given section of a template session
    @PostMapping("/hide-section")
    public ResponseEntity<Void> hideSection(@RequestBody HideSectionModel hideSectionModel) {
        try {
            ArrayList<LineModel> lines = _templateCacheUtility.get(hideSectionModel.session);
            if (lines == null) {
                return ResponseEntity.status(401).build();
            }
            _templateLogic.hideSection(lines, hideSectionModel.section);
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Unhide a given section of a template session
    @PostMapping("/unhide-section")
    public ResponseEntity<Void> unhideSection(@RequestBody UnhideSectionModel unhideSectionModel) {
        try {
            ArrayList<LineModel> lines = _templateCacheUtility.get(unhideSectionModel.session);
            if (lines == null) {
                return ResponseEntity.status(401).build();
            }
            _templateLogic.unhideSection(lines, unhideSectionModel.section);
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Perform multiple swaps of a given section and a list of targets
    @PostMapping("/swap-multiple-sections")
    public ResponseEntity<Void> swapMultipleSections(@RequestBody SwapMultipleSectionsModel swapMultipleSectionsModel) {
        try {
            ArrayList<LineModel> lines = _templateCacheUtility.get(swapMultipleSectionsModel.session);
            if (lines == null) {
                return ResponseEntity.badRequest().build();
            }

            for (String target : swapMultipleSectionsModel.targets) {
                _templateLogic.swapSections(lines, swapMultipleSectionsModel.section,
                        target);
            }
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
