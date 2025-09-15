package Project.tamil.Management_System.Mapper;

import Project.tamil.Management_System.dto.UserDto;
import Project.tamil.Management_System.entity.User;

public class UserMapper {

    // Convert User entity to DTO
    public static UserDto mapToDto(User user) {
        if (user == null) return null;

        return new UserDto(
            user.getId(),
            user.getName(),
            user.getAge(),
            user.getPhone(),
            user.getUsername(),
            user.getPassword(),
            user.getAddress(),
            user.getCity(),
            user.getState(),
            user.getCountry(),
            "", // location not used
            user.isApproved()
        );
    }

    // Convert DTO to Entity
    public static User mapToEntity(UserDto dto) {
        if (dto == null) return null;

        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setAge(dto.getAge());
        user.setPhone(dto.getPhone());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setAddress(dto.getAddress());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setCountry(dto.getCountry());
        user.setApproved(dto.isApproved());

        return user;
    }
}
