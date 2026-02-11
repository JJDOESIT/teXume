package ResumeBuilder.backend.Controllers;

import org.springframework.http.ResponseEntity;
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
import ResumeBuilder.backend.Models.DatabaseModels.LineModel;
import ResumeBuilder.backend.Models.DatabaseModels.SectionModel;
import ResumeBuilder.backend.Models.DatabaseModels.TemplateModel;
import ResumeBuilder.backend.Models.DatabaseModels.UserInfoModel;
import ResumeBuilder.backend.Repositories.SectionTypeRepository;
import ResumeBuilder.backend.Repositories.TemplateRepository;
import ResumeBuilder.backend.Utilities.TemplateCacheUtility;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/template")
public class TemplateController {
    private final TemplateLogic _templateLogic;
    private final TemplateCacheUtility _templateCacheUtility;
    private final SectionTypeRepository _sectionTypeRepository;
    private final TemplateRepository _templateRepository;

    public TemplateController(TemplateLogic templateLogic, TemplateCacheUtility templateCacheUtility,
            SectionTypeRepository sectionTypeRepository, TemplateRepository templateRepository) {
        _templateLogic = templateLogic;
        _templateCacheUtility = templateCacheUtility;
        _sectionTypeRepository = sectionTypeRepository;
        _templateRepository = templateRepository;
    }

    // Add a latex template to the database
    @PostMapping("/addTemplate")
    public ResponseEntity<Void> addTemplate(@RequestBody AddTemplateModel addTemplateModel) {
        try {
            Path pdfPath = Paths.get("./backend/assets/templates/" + addTemplateModel.name +
                    ".tex");
            byte[] bytes = Files.readAllBytes(pdfPath);

            TemplateModel templateModel = new TemplateModel();
            templateModel.name = addTemplateModel.name;
            templateModel.file = bytes;

            for (int index = 0; index < addTemplateModel.sections.size(); index++) {
                SectionModel sectionModel = new SectionModel();
                sectionModel.sectionOrder = index;
                String section = addTemplateModel.sections.get(index);
                sectionModel.sectionTypeModel = _sectionTypeRepository.findByType(section).get();
                templateModel.sections.add(sectionModel);
            }
            _templateRepository.save(templateModel);
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    // Initialize a template session
    @PostMapping("/initializeTemplate")
    public ResponseEntity<Map<String, String>> initializeTemplate(
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

            Optional<TemplateModel> optionalTemplateModel = _templateRepository
                    .findByName(initializeTemplateModel.name);
            TemplateModel templateModel = optionalTemplateModel.get();

            byte[] file = templateModel.file;

            Path path = Paths.get("./backend/assets/temp/" + session + ".tex");
            Files.write(path, file);

            BufferedReader reader = Files.newBufferedReader(path);

            while ((line = reader.readLine()) != null) {
                LineModel lineModel = new LineModel(line);
                lines.add(lineModel);
            }

            reader.close();
            Files.delete(path);

            _templateCacheUtility.put(session, lines);
            return ResponseEntity.ok().body(Map.of("session", session));
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Compile a template given user info and an existing template session
    @PostMapping("/compileTemplate")
    public ResponseEntity<byte[]> compileTemplate(@RequestBody ModifyTemplateModel modifyTemplateModel) {
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
            builder.inheritIO();
            Process process = builder.start();
            process.waitFor();

            Path pdfPath = Paths.get(base + ".pdf");
            byte[] pdfBytes = Files.readAllBytes(pdfPath);

            Files.delete(Paths.get(base + ".tex"));
            Files.delete(Paths.get(base + ".out"));
            Files.delete(Paths.get(base + ".log"));
            Files.delete(Paths.get(base + ".aux"));
            Files.delete(Paths.get(base + ".pdf"));

            return ResponseEntity.ok().body(pdfBytes);
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    // Hide a given section of a template session
    @PostMapping("/hideSection")
    public ResponseEntity<Void> hideSection(@RequestBody HideSectionModel hideSectionModel) {
        try {
            ArrayList<LineModel> lines = _templateCacheUtility.get(hideSectionModel.session);
            if (lines == null) {
                return ResponseEntity.badRequest().build();
            }
            _templateLogic.hideSection(lines, hideSectionModel.section);
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    // Perform multiple swaps of a given section and a list of targets
    @PostMapping("/swapMultipleSections")
    public ResponseEntity<Void> swapMultipleSections(@RequestBody SwapMultipleSectionsModel swapMultipleSectionsModel) {
        try {
            ArrayList<LineModel> lines = _templateCacheUtility.get(swapMultipleSectionsModel.session);
            if (lines == null) {
                return ResponseEntity.badRequest().build();
            }

            for (String target : swapMultipleSectionsModel.targets) {
                _templateLogic.swapSections(lines, swapMultipleSectionsModel.section.toLowerCase(),
                        target.toLowerCase());
            }
            return ResponseEntity.ok().build();
        } catch (Exception error) {
            System.out.println(error.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
