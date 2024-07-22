CREATE OR ALTER PROCEDURE getIncident
(
    @IncidentId VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM IncidentTables
    WHERE IncidentId = @IncidentId;
END;
