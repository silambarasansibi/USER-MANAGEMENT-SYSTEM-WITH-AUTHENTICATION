package Project.tamil.Management_System.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private int age;
    private long phone;
    private String username;
    private String password;
    private String address;
    private String city;
    private String state;
    private String country;
    private String location; // Optional, unused for now
    private boolean approved;
}
