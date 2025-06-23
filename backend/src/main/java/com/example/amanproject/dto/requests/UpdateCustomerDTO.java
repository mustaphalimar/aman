package com.example.amanproject.dto.requests;


import lombok.Data;

@Data
public class UpdateCustomerDTO {
    //@NotBlank(message = "First name is required")
    private String firstName;

    //@NotBlank(message = "Last name is required")
    private String lastName;

    //@Email(message = "Email should be valid")
    //@NotBlank(message = "Email is required")
    private String email;

    //@NotBlank(message = "Phone is required")
    private String phone;

    private Long roleId;

    // Constructors
    public UpdateCustomerDTO() {}

    // Getters and Setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }
}
