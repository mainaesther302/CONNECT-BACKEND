CREATE OR ALTER PROCEDURE updateIncident
(
    @UserId VARCHAR(255),
    @IncidentId VARCHAR(255),
    @Image VARCHAR(255),
    @Title VARCHAR(255),
    @Location VARCHAR(255),

    @DateCreated DATE,
    @Description VARCHAR(255)

)
AS
BEGIN

    UPDATE IncidentTables
    SET 
    UserId=@UserId ,
    IncidentId=@IncidentId ,
    Image=@Image ,
    Title=@Title,
    Location=@Location ,

    DateCreated=@DateCreated ,
    Description=@Description 
    ;
END;
