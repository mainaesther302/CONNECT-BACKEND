CREATE OR ALTER PROCEDURE deleteView
(
    @ViewId VARCHAR(255)
)
AS
BEGIN
    DELETE FROM viewsTable
    WHERE ViewId = @ViewId;
END;
