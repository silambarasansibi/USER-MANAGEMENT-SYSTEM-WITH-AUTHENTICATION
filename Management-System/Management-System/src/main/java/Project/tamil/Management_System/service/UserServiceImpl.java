package Project.tamil.Management_System.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Project.tamil.Management_System.dto.UserDto;
import Project.tamil.Management_System.entity.User;
import Project.tamil.Management_System.repository.UserRepository;
import Project.tamil.Management_System.Mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void registerUser(UserDto dto) {
        User user = UserMapper.mapToEntity(dto);
        user.setApproved(false); // default status
        userRepository.save(user);
    }

    @Override
    public UserDto loginUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password)
                .map(UserMapper::mapToDto)
                .orElse(null);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getPendingUsers() {
        return userRepository.findByApproved(false).stream()
                .map(UserMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto approveUser(Long id) {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isPresent()) {
            User user = optional.get();
            user.setApproved(true);
            return UserMapper.mapToDto(userRepository.save(user));
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void updateUser(Long id, UserDto dto) {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isPresent()) {
            User user = optional.get();
            user.setName(dto.getName());
            user.setAge(dto.getAge());
            user.setPhone(dto.getPhone());
            user.setAddress(dto.getAddress());
            user.setCity(dto.getCity());
            user.setState(dto.getState());
            user.setCountry(dto.getCountry());
            userRepository.save(user);
        }
    }

    @Override
    public void updateUserByUsername(String username, UserDto dto) {
        Optional<User> optional = userRepository.findByUsername(username);
        if (optional.isPresent()) {
            User user = optional.get();
            user.setName(dto.getName());
            user.setAge(dto.getAge());
            user.setPhone(dto.getPhone());
            user.setAddress(dto.getAddress());
            user.setCity(dto.getCity());
            user.setState(dto.getState());
            user.setCountry(dto.getCountry());
            userRepository.save(user);
        }
    }

    @Override
    public UserDto getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(UserMapper::mapToDto)
                .orElse(null);
    }

    @Override
    public Optional<UserDto> getUserById(Long id) {
        return userRepository.findById(id)
                .map(UserMapper::mapToDto);
    }

    @Override
    public void declineUser(Long id) {
        userRepository.deleteById(id);
    }
}
