CREATE PROCEDURE DeletePoll 
    @PollID INT
AS
BEGIN
    DELETE FROM Polls WHERE PollID = @PollID;
END;
