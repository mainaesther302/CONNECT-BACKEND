CREATE OR ALTER PROCEDURE addUser
(
    @UserId VARCHAR(255),
    @UserName VARCHAR(255),
    @Email VARCHAR(255),
    @Password VARCHAR(255),
    @Role VARCHAR(255)
)
AS
BEGIN
    -- Insert the new user details
    INSERT INTO UsersTable (UserId, UserName, Email, Password,Role)
    VALUES (@UserId, @UserName, @Email, @Password,@Role);
END;