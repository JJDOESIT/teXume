package ResumeBuilder.backend.Models.DatabaseModels;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import ResumeBuilder.backend.Interfaces.IWriter;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "skill")
public class SkillModel implements IWriter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public int id;

    @Column
    public String category;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "skill_id")
    public List<SkillBulletPointModel> description;

    public Object get(String key) {
        if (key.equals("category")) {
            return category;
        } else if (key.equals("description")) {
            return description;
        }
        return null;
    }
}
