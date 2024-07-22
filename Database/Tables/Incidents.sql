USE CONNECT
CREATE TABLE IncidentssTables(
    IncidentId VARCHAR (255) PRIMARY KEY NOT NULL,
    UserId VARCHAR (255) ,
    Image VARCHAR (255) NOT NULL,
    Title VARCHAR (255) NOT NULL,
    Location VARCHAR (255) NOT NULL,
    Description TEXT NOT NULL,

    

    FOREIGN KEY (UserId) REFERENCES SignUpTable(UserId)
)
