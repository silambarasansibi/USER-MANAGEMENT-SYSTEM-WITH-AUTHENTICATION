package Project.tamil.Management_System.service;

import java.util.List;
import java.util.Optional;

import Project.tamil.Management_System.dto.UserDto;

public interface UserService {

    void registerUser(UserDto userDto);

    UserDto loginUser(String username, String password);

    List<UserDto> getAllUsers();

    List<UserDto> getPendingUsers();

    UserDto approveUser(Long id);

    UserDto getUserByUsername(String username);

    Optional<UserDto> getUserById(Long id);

    void updateUser(Long id, UserDto dto); // Admin updates

    void updateUserByUsername(String username, UserDto dto); // User updates

    void deleteUser(Long id); // Delete user

    void declineUser(Long id); // Delete unapproved user
}
