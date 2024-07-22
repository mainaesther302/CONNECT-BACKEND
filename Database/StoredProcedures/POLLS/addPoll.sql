CREATE OR ALTER PROCEDURE AddPoll
    (
    @PollId VARCHAR (255),
    @Title VARCHAR(255),
    @Description VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Polls
        (PollId,Title, Description)
    VALUES
        (@PollId,@Title, @Description);

END;
