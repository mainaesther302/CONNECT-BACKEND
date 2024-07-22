CREATE OR ALTER PROCEDURE deleteIncident
(
    @IncidentId VARCHAR(255)
)
AS
BEGIN
    DELETE FROM IncidentTables
    WHERE IncidentId = @IncidentId;
END;
