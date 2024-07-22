CREATE OR ALTER PROCEDURE addView
(
    @UserId VARCHAR(255),
    @ViewId VARCHAR(255),
    @Image VARCHAR(255),
    @Description VARCHAR(255)
)
AS
BEGIN
    -- Insert the new view details
    INSERT INTO viewsTable (ViewId, UserId, Image, Description)
    VALUES (@ViewId, @UserId, @Image, @Description);
END;
