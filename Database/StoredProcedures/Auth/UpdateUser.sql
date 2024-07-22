CREATE OR ALTER PROCEDURE updateUser
(
    @Id VARCHAR(255),
    @UserName VARCHAR(255),
    @Email VARCHAR(255),
    @Role VARCHAR(255),
    @Status VARCHAR(255),
    @Password VARCHAR(255)
)
AS
BEGIN
    UPDATE UsersTable
    SET 
        UserName = @UserName,
        Email = @Email,
        Role = @Role,
        Status = @Status,
        Password = @Password
    WHERE UserId = @Id;
END;
