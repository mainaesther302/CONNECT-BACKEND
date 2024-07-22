CREATE OR ALTER PROCEDURE getView
(
    @ViewId VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM viewsTable
    WHERE ViewId = @ViewId;
END;
