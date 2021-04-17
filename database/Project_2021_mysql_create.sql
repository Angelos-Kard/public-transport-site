CREATE TABLE `Grammi` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`onoma` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Pernaei` (
	`grammiID` INT NOT NULL,
	`stasiID` INT NOT NULL,
	`seira` INT NOT NULL,
	`ora` VARCHAR(255) NOT NULL,
	`imera` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`grammiID`)
);

CREATE TABLE `Stasi` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`onoma` VARCHAR(255) NOT NULL,
	`geografikiThesi` VARCHAR(255) NOT NULL,
	`zoni` varchar(1) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Zoni` (
	`id` varchar(1) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Eisitirio` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`timi` FLOAT NOT NULL,
	`typos` VARCHAR(255) NOT NULL,
	`zoni` varchar(1) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `MiniaiaKarta` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`typos` VARCHAR(255) NOT NULL AUTO_INCREMENT,
	`timi` FLOAT NOT NULL,
	`zoni` varchar(1) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ExeiEisitirio` (
	`eisitirioID` INT NOT NULL,
	`xristisID` INT NOT NULL,
	`posotita` INT NOT NULL,
	PRIMARY KEY (`eisitirioID`,`xristisID`)
);

CREATE TABLE `ExeiMiniaia` (
	`miniaiaID` DATE NOT NULL,
	`xristisID` INT NOT NULL,
	`imerominiaEnarksis` DATE NOT NULL,
	PRIMARY KEY (`miniaiaID`,`xristisID`)
);

CREATE TABLE `Xristis` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`onoma` VARCHAR(255) NOT NULL,
	`eponymo` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`katastasi` INT,
	`imerominiaEggrafis` DATE NOT NULL,
	`ArithmosKartas` INT,
	`imerominiaEkdosis` DATE,
	`imerominiaLiksis` DATE,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Pernaei` ADD CONSTRAINT `Pernaei_fk0` FOREIGN KEY (`grammiID`) REFERENCES `Grammi`(`id`);

ALTER TABLE `Pernaei` ADD CONSTRAINT `Pernaei_fk1` FOREIGN KEY (`stasiID`) REFERENCES `Stasi`(`id`);

ALTER TABLE `Stasi` ADD CONSTRAINT `Stasi_fk0` FOREIGN KEY (`zoni`) REFERENCES `Zoni`(`id`);

ALTER TABLE `Eisitirio` ADD CONSTRAINT `Eisitirio_fk0` FOREIGN KEY (`zoni`) REFERENCES `Zoni`(`id`);

ALTER TABLE `MiniaiaKarta` ADD CONSTRAINT `MiniaiaKarta_fk0` FOREIGN KEY (`zoni`) REFERENCES `Zoni`(`id`);

ALTER TABLE `ExeiEisitirio` ADD CONSTRAINT `ExeiEisitirio_fk0` FOREIGN KEY (`eisitirioID`) REFERENCES `Eisitirio`(`id`);

ALTER TABLE `ExeiEisitirio` ADD CONSTRAINT `ExeiEisitirio_fk1` FOREIGN KEY (`xristisID`) REFERENCES `Xristis`(`id`);

ALTER TABLE `ExeiMiniaia` ADD CONSTRAINT `ExeiMiniaia_fk0` FOREIGN KEY (`miniaiaID`) REFERENCES `MiniaiaKarta`(`id`);

ALTER TABLE `ExeiMiniaia` ADD CONSTRAINT `ExeiMiniaia_fk1` FOREIGN KEY (`xristisID`) REFERENCES `Xristis`(`id`);

