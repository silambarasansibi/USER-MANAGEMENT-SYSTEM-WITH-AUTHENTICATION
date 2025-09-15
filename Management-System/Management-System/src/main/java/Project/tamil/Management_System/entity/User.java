package Project.tamil.Management_System.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int age;
    
    @Column(nullable = false, unique = true)
    private long phone;

    private String address;
    private String city;
    private String state;
    private String country;

    @Column(nullable = false, unique = true)
    private String username;

    private String password;

    private boolean approved = false;
}
