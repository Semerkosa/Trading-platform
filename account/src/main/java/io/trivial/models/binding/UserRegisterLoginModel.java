package io.trivial.models.binding;

public class UserRegisterLoginModel extends BaseBindingModel {

    private String email;
    private String password;

    public UserRegisterLoginModel() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
