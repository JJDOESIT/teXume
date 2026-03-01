package ResumeBuilder.backend.Models.DatabaseModels;

import java.util.ArrayList;
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
@Table(name = "user_info")
public class UserInfoModel implements IWriter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public int id;

    @Column(name = "first_name")
    public String firstName = new String();

    @Column(name = "last_name")
    public String lastName = new String();

    @Column
    public String email = new String();

    @Column
    public String phone = new String();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_info_id")
    public List<EducationModel> educations = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_info_id")
    public List<ExperienceModel> experiences = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_info_id")
    public List<ProjectModel> projects = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_info_id")
    public List<SkillModel> skills = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_info_id")
    public List<AchievementModel> achievements = new ArrayList<>();

    public Object get(String key) {
        if (key.equals("name")) {
            return firstName + " " + lastName;
        } else if (key.equals("email")) {
            return email;
        } else if (key.equals("phone")) {
            return phone;
        } else if (key.equals("education")) {
            return educations;
        } else if (key.equals("experience")) {
            return experiences;
        } else if (key.equals("projects")) {
            return projects;
        } else if (key.equals("skills")) {
            return skills;
        } else if (key.equals("achievements")) {
            return achievements;
        }
        return null;
    }
}
