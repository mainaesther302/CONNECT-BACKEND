CREATE OR ALTER PROCEDURE addIncidents
(
    @UserId VARCHAR(255),
    @IncidentId VARCHAR(255),
    @Image VARCHAR(255),
    @Title VARCHAR(255),
    @Location VARCHAR(255),

    @Description VARCHAR(255)

)
AS
BEGIN

    INSERT INTO IncidentssTables (
    UserId,
    IncidentId ,
    Image ,
    Title ,
    Location ,

   
    Description 
    )
    VALUES (
        @UserId ,
    @IncidentId ,
    @Image ,
    @Title,
    @Location ,

    
    @Description 
    );
END;
