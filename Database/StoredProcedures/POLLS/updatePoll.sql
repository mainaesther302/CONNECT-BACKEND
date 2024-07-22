CREATE PROCEDURE UpdatePoll 
    @PollID INT,
    @Title NVARCHAR(255),
    @Description NVARCHAR(MAX)
AS
BEGIN
    UPDATE Polls SET Title = @Title, Description = @Description WHERE PollID = @PollID;
END;
