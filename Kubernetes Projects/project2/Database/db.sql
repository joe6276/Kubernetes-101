
CREATE DATABASE Fancy;


USE Fancy;

CREATE TABLE Skoobs(
    Id VARCHAR(200),
    Name VARCHAR(500),
    Price INT
)

USE Fancy

CREATE OR ALTER PROCEDURE addBooks(
    @Id VARCHAR(200), @Name VARCHAR(500), @price INT
)
AS
BEGIN
INSERT INTO Skoobs(Id,Name, price) VALUES(@Id, @Name , @price)
END

USE Fancy

CREATE OR ALTER PROCEDURE getBooks
AS
BEGIN
SELECT * FROm Skoobs
END