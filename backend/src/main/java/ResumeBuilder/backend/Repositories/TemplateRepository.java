package ResumeBuilder.backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ResumeBuilder.backend.Models.DatabaseModels.TemplateModel;

@Service
public class TemplateRepository {
    private final TemplateInterface _templateInterface;

    public TemplateRepository(TemplateInterface templateInterface) {
        _templateInterface = templateInterface;
    }

    public void save(TemplateModel templateModel) {
        _templateInterface.save(templateModel);
    }

    public void delete(TemplateModel templateModel) {
        _templateInterface.delete(templateModel);
    }

    public Optional<TemplateModel> findById(int id) {
        return _templateInterface.findById(id);
    }

    public Optional<TemplateModel> findByName(String name) {
        return _templateInterface.findByName(name);
    }

    public List<TemplateModel> findAll() {
        return _templateInterface.findAll();
    }
}
