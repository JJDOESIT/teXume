package ResumeBuilder.template.Controllers;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ResumeBuilder.template.Logic.TemplateLogic;
import ResumeBuilder.template.Models.Api.Template.AddTemplateModel;
import ResumeBuilder.template.Models.Api.Template.HideSectionModel;
import ResumeBuilder.template.Models.Api.Template.InitializeTemplateModel;
import ResumeBuilder.template.Models.Api.Template.ModifyTemplateModel;
import ResumeBuilder.template.Models.Api.Template.SwapMultipleSectionsModel;
import ResumeBuilder.template.Models.Api.Template.UnhideSectionModel;
import ResumeBuilder.template.Models.Api.Template.UpdateSectionNameModel;
import ResumeBuilder.template.Utilities.LinesCacheUtility;
import ResumeBuilder.template.Utilities.SectionMapUtility;
import ResumeBuilder.common.Models.Common.LineModel;
import ResumeBuilder.common.Models.Database.TemplateModel;
import ResumeBuilder.common.Models.Database.UserAccountModel;
import ResumeBuilder.common.Models.Database.UserInfoModel;
import ResumeBuilder.common.Repositories.Template.TemplateRepository;
import ResumeBuilder.common.Repositories.UserAccount.UserAccountRepository;
import jakarta.servlet.http.HttpServletRequest;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FilenameFilter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;

@RestController
@RequestMapping("/api/template")
public class TemplateController {
    private final TemplateLogic _templateLogic;
    private final LinesCacheUtility _linesCacheUtility;
    private final SectionMapUtility _sectionMapUtility;
    private final TemplateRepository _templateRepository;
    private final UserAccountRepository _userAccountRepository;

    public TemplateController(TemplateLogic templateLogic, LinesCacheUtility linesCacheUtility,
            SectionMapUtility sectionMapUtility,
            TemplateRepository templateRepository,
            UserAccountRepository userAccountRepository) {
        _templateLogic = templateLogic;
        _linesCacheUtility = linesCacheUtility;
        _sectionMapUtility = sectionMapUtility;
        _templateRepository = templateRepository;
        _userAccountRepository = userAccountRepository;

    }

    // Add a latex template to the database
    @PostMapping("/add")
    public ResponseEntity<Void> add(@RequestBody AddTemplateModel addTemplateModel, HttpServletRequest request) {
        try {
            String identity = request.getHeader("identity");
            boolean isAdmin = request.getHeader("role") == "admin";

            if (!isAdmin) {
                return ResponseEntity.status(403).build();
            }

            UserAccountModel userAccountModel = _userAccountRepository
                    .findByUsername(identity).get();

            Path directory = Paths.get("./server/template/assets/templates/");
            Path path = directory.resolve(addTemplateModel.name + ".tex");

            ArrayList<LineModel> lines = new ArrayList<>();
            String line;
            BufferedReader reader = Files.newBufferedReader(path);
            while ((line = reader.readLine()) != null) {
                LineModel lineModel = new LineModel(line);
                lines.add(lineModel);
            }
            reader.close();
            String session = UUID.randomUUID().toString();
            _linesCacheUtility.put(session, lines);

            ModifyTemplateModel modifyTemplateModel = new ModifyTemplateModel();
            modifyTemplateModel.session = session;
            modifyTemplateModel.userInfoModel = userAccountModel.userInfoModel;
            Map<String, byte[]> data = compile(modifyTemplateModel).getBody();

            PDDocument document = Loader.loadPDF(data.get("pdf"));
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
                success = _linesCacheUtility.putIfAbsent(session, lines);
                if (success) {
                    break;
                }
                session = UUID.randomUUID().toString();
            }

            if (!success) {
                return ResponseEntity.status(500).build();
            }

            Path cwd = Path.of("").toAbsolutePath();
            System.out.println(cwd);
            File file = new File(cwd.toString());
            String[] directories = file.list(new FilenameFilter() {
                @Override
                public boolean accept(File current, String name) {
                    return new File(current, name).isDirectory();
                }
            });
            System.out.println(Arrays.toString(directories));
            Path directory = Paths.get("server/template/assets/templates/").toAbsolutePath();
            System.out.println(directory);
            Path path = directory.resolve(initializeTemplateModel.name + ".tex");

            BufferedReader reader = Files.newBufferedReader(path);
            while ((line = reader.readLine()) != null) {
                LineModel lineModel = new LineModel(line);
                lines.add(lineModel);
            }

            reader.close();

            HashMap<String, String> sectionMap = new HashMap<>();
            ArrayList<String> sectionNames = _templateLogic.fetchSectionNames(lines);
            sectionMap.put("education", sectionNames.get(0));
            sectionMap.put("experience", sectionNames.get(1));
            sectionMap.put("projects", sectionNames.get(2));
            sectionMap.put("skills", sectionNames.get(3));
            sectionMap.put("achievements", sectionNames.get(4));
            _linesCacheUtility.put(session, lines);
            _sectionMapUtility.put(session, sectionMap);

            return ResponseEntity.ok().body(Map.of("session", session));
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Compile a template given user info and an existing template session
    @PostMapping("/compile")
    public ResponseEntity<Map<String, byte[]>> compile(@RequestBody ModifyTemplateModel modifyTemplateModel) {
        try {
            ArrayList<LineModel> lines = _linesCacheUtility.get(modifyTemplateModel.session);
            Map<String, String> sectionMap = _sectionMapUtility.get(modifyTemplateModel.session);
            if (lines == null || sectionMap == null) {
                return ResponseEntity.status(401).build();
            }

            ArrayList<UserInfoModel> userModels = new ArrayList<>();
            userModels.add(modifyTemplateModel.userInfoModel);

            Path directory = Paths.get("./server/template/assets/outputs/");
            Files.createDirectories(directory);
            Path standard = directory.resolve(modifyTemplateModel.session);
            Path base = directory.resolve(modifyTemplateModel.session);

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

            _templateLogic.solve(lines, userModels, 0, writer, sectionMap);
            writer.close();

            String formattedBase = base.toString().replace("\\", "/");
            ProcessBuilder builder = new ProcessBuilder("pdflatex", "--no-shell-escape",
                    "--output-directory=" + directory,
                    "--interaction=nonstopmode", formattedBase + ".tex");

            builder.redirectOutput(ProcessBuilder.Redirect.DISCARD);
            builder.redirectError(ProcessBuilder.Redirect.DISCARD);

            Process process = builder.start();
            process.waitFor();

            byte[] pdfBytes = Files.readAllBytes(Paths.get(base + ".pdf"));
            byte[] latexBytes = Files.readAllBytes(Paths.get(base + ".tex"));

            Files.deleteIfExists(Paths.get(base + ".tex"));
            Files.deleteIfExists(Paths.get(base + ".out"));
            Files.deleteIfExists(Paths.get(base + ".log"));
            Files.deleteIfExists(Paths.get(base + ".aux"));
            Files.deleteIfExists(Paths.get(base + ".pdf"));

            return ResponseEntity.ok().body(Map.of("pdf", pdfBytes, "latex", latexBytes));
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Update a section name
    @PostMapping("/update-section-name")
    public ResponseEntity<Void> updateSectionName(@RequestBody UpdateSectionNameModel updateSectionNameModel) {
        try {
            Map<String, String> sectionMap = _sectionMapUtility.get(updateSectionNameModel.session);
            if (sectionMap == null) {
                return ResponseEntity.status(401).build();
            }
            sectionMap.put(updateSectionNameModel.section.toLowerCase(), updateSectionNameModel.newSection);
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Hide a given section of a template session
    @PostMapping("/hide-section")
    public ResponseEntity<Void> hideSection(@RequestBody HideSectionModel hideSectionModel) {
        try {
            ArrayList<LineModel> lines = _linesCacheUtility.get(hideSectionModel.session);
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
            ArrayList<LineModel> lines = _linesCacheUtility.get(unhideSectionModel.session);
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
            ArrayList<LineModel> lines = _linesCacheUtility.get(swapMultipleSectionsModel.session);
            if (lines == null) {
                return ResponseEntity.status(401).build();
            }
            for (String target : swapMultipleSectionsModel.targets) {
                _templateLogic.swapSections(lines, swapMultipleSectionsModel.section,
                        target);
            }
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
}
