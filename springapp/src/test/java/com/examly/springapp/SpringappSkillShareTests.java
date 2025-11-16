package com.examly.springapp;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import java.io.File;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappSkillShareTests {

    @Autowired
    private MockMvc mockMvc;

    // ---------- Core API Tests ----------
    @Order(1)
    @Test
    void AddSkillShareReturns200() throws Exception {
        String skillShareData = """
                {
                    "skillName": "React Development",
                    "category": "Technology",
                    "skillLevel": "Advanced",
                    "userEmail": "john.doe@example.com",
                    "description": "I can teach modern React development with hooks, context, and best practices",
                    "availability": "Available"
                }
                """;

        mockMvc.perform(post("/api/skillshares/addSkillShare")
                        .with(jwt())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(skillShareData)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Order(2)
    @Test
    void GetAllSkillSharesReturnsArray() throws Exception {
        mockMvc.perform(get("/api/skillshares/allSkillShares")
                        .with(jwt())
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andReturn();
    }

    @Order(3)
    @Test
    void GetSkillShareByIdReturns200() throws Exception {
        mockMvc.perform(get("/api/skillshares/1")
                        .with(jwt())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.skillName").exists())
                .andReturn();
    }

    @Order(4)
    @Test
    void UpdateSkillShareReturns200() throws Exception {
        String updatedData = """
                {
                    "skillName": "React Development",
                    "category": "Technology",
                    "skillLevel": "Expert",
                    "userEmail": "john.doe@example.com",
                    "description": "I can teach advanced React development including performance optimization and testing",
                    "availability": "Weekend Only"
                }
                """;

        mockMvc.perform(put("/api/skillshares/1")
                        .with(jwt())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedData)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.skillLevel").value("Expert"))
                .andReturn();
    }

    @Order(5)
    @Test
    void DeleteSkillShareReturns200() throws Exception {
        mockMvc.perform(delete("/api/skillshares/1")
                        .with(jwt())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    // ---------- Project Structure Tests ----------
    @Test
    void ControllerDirectoryExists() {
        String directoryPath = "src/main/java/com/examly/springapp/controller";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void SkillShareControllerFileExists() {
        String filePath = "src/main/java/com/examly/springapp/controller/SkillShareController.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void ModelDirectoryExists() {
        String directoryPath = "src/main/java/com/examly/springapp/model";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void SkillShareModelFileExists() {
        String filePath = "src/main/java/com/examly/springapp/model/SkillShare.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void RepositoryDirectoryExists() {
        String directoryPath = "src/main/java/com/examly/springapp/repository";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void ServiceDirectoryExists() {
        String directoryPath = "src/main/java/com/examly/springapp/service";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    void SkillShareServiceClassExists() {
        checkClassExists("com.examly.springapp.service.SkillShareService");
    }

    @Test
    void SkillShareModelClassExists() {
        checkClassExists("com.examly.springapp.model.SkillShare");
    }

    @Test
    void SkillShareModelHasSkillNameField() {
        checkFieldExists("com.examly.springapp.model.SkillShare", "skillName");
    }

    @Test
    void SkillShareModelHasCategoryField() {
        checkFieldExists("com.examly.springapp.model.SkillShare", "category");
    }

    @Test
    void SkillShareModelHasSkillLevelField() {
        checkFieldExists("com.examly.springapp.model.SkillShare", "skillLevel");
    }

    @Test
    void SkillShareModelHasUserEmailField() {
        checkFieldExists("com.examly.springapp.model.SkillShare", "userEmail");
    }

    @Test
    void SkillShareModelHasDescriptionField() {
        checkFieldExists("com.examly.springapp.model.SkillShare", "description");
    }

    @Test
    void SkillShareModelHasAvailabilityField() {
        checkFieldExists("com.examly.springapp.model.SkillShare", "availability");
    }

    @Test
    void SkillShareRepoExtendsJpaRepository() {
        checkClassImplementsInterface("com.examly.springapp.repository.SkillShareRepository",
                "org.springframework.data.jpa.repository.JpaRepository");
    }

    @Test
    void SkillShareNotFoundExceptionClassExists() {
        checkClassExists("com.examly.springapp.exception.SkillShareNotFoundException");
    }

    @Test
    void SkillShareNotFoundExceptionExtendsRuntimeException() {
        try {
            Class<?> clazz = Class.forName("com.examly.springapp.exception.SkillShareNotFoundException");
            assertTrue(RuntimeException.class.isAssignableFrom(clazz),
                    "SkillShareNotFoundException should extend RuntimeException");
        } catch (ClassNotFoundException e) {
            fail("SkillShareNotFoundException class does not exist.");
        }
    }

    // ---------- Helpers ----------
    private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

    private void checkFieldExists(String className, String fieldName) {
        try {
            Class<?> clazz = Class.forName(className);
            clazz.getDeclaredField(fieldName);
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            fail("Field " + fieldName + " in class " + className + " does not exist.");
        }
    }

    private void checkClassImplementsInterface(String className, String interfaceName) {
        try {
            Class<?> clazz = Class.forName(className);
            Class<?> interfaceClazz = Class.forName(interfaceName);
            assertTrue(interfaceClazz.isAssignableFrom(clazz));
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " or interface " + interfaceName + " does not exist.");
        }
    }
}