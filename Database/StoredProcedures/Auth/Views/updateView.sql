CREATE OR ALTER PROCEDURE updateView
(
    @ViewId VARCHAR(255),
    @UserId VARCHAR(255),
    @Image VARCHAR(255),
    @Description VARCHAR(255)
)
AS
BEGIN
    UPDATE viewsTable
    SET 
        UserId = @UserId,
        Image = @Image,
        Description = @Description
    WHERE ViewId = @ViewId;
END;
