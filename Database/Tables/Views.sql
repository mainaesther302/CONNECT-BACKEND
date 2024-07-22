Use CONNECT

CREATE TABLE viewsTable(
    ViewId VARCHAR(255) PRIMARY KEY NOT NULL,
    UserId VARCHAR(255) ,
    Image VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,

    FOREIGN KEY (UserId) REFERENCES SignUpTable(UserId)
)

drop table viewsTable
