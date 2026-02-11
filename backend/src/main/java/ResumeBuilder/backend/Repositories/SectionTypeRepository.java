package ResumeBuilder.backend.Repositories;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ResumeBuilder.backend.Models.DatabaseModels.SectionTypeModel;

@Service
public class SectionTypeRepository {
    private final SectionTypeInterface _sectionTypeInterface;

    public SectionTypeRepository(SectionTypeInterface sectionTypeInterface) {
        _sectionTypeInterface = sectionTypeInterface;
    }

    public Optional<SectionTypeModel> findByType(String type) {
        return _sectionTypeInterface.findByType(type);
    }
}
