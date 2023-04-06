import { MigrationInterface, QueryRunner } from "typeorm";

export class FakePost1680699268027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
insert into posts (description, image, userId, createdDate) values ('erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero', 'http://dummyimage.com/x.png/ff4444/ffffff', 5, '2023-03-09 23:36:52');
insert into posts (description, image, userId, createdDate) values ('orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus', 'http://dummyimage.com/x.png/dddddd/000000', 5, '2023-03-04 06:49:34');
insert into posts (description, image, userId, createdDate) values ('adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget', 'http://dummyimage.com/x.png/5fa2dd/ffffff', 2, '2023-03-25 08:09:02');
insert into posts (description, image, userId, createdDate) values ('amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas', 'http://dummyimage.com/x.png/5fa2dd/ffffff', 5, '2023-03-22 01:28:36');
insert into posts (description, image, userId, createdDate) values ('enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin', 'http://dummyimage.com/x.png/cc0000/ffffff', 4, '2023-03-25 15:15:11');
insert into posts (description, image, userId, createdDate) values ('amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl', 'http://dummyimage.com/x.png/cc0000/ffffff', 6, '2023-03-20 19:05:15');
insert into posts (description, image, userId, createdDate) values ('elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non', 'http://dummyimage.com/x.png/5fa2dd/ffffff', 2, '2023-03-30 21:02:36');
insert into posts (description, image, userId, createdDate) values ('dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere', 'http://dummyimage.com/x.png/ff4444/ffffff', 5, '2023-03-26 17:29:17');
insert into posts (description, image, userId, createdDate) values ('suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet', 'http://dummyimage.com/x.png/dddddd/000000', 5, '2023-03-06 11:33:59');
insert into posts (description, image, userId, createdDate) values ('sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero', 'http://dummyimage.com/x.png/5fa2dd/ffffff', 6, '2023-03-12 04:36:55');
insert into posts (description, image, userId, createdDate) values ('velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta', 'http://dummyimage.com/x.png/ff4444/ffffff', 4, '2023-03-31 07:09:51');
insert into posts (description, image, userId, createdDate) values ('nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis', 'http://dummyimage.com/x.png/5fa2dd/ffffff', 6, '2023-03-22 16:39:35');
insert into posts (description, image, userId, createdDate) values ('ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla', 'http://dummyimage.com/x.png/cc0000/ffffff', 1, '2023-03-08 05:16:52');
insert into posts (description, image, userId, createdDate) values ('nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis', 'http://dummyimage.com/x.png/dddddd/000000', 6, '2023-03-10 01:25:09');
insert into posts (description, image, userId, createdDate) values ('volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam', 'http://dummyimage.com/x.png/5fa2dd/ffffff', 3, '2023-03-15 02:32:16');
insert into posts (description, image, userId, createdDate) values ('morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla', 'http://dummyimage.com/x.png/ff4444/ffffff', 5, '2023-03-27 14:05:12');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
