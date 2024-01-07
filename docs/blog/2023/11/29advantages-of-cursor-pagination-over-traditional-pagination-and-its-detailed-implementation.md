# Advantages of Cursor Pagination over Traditional Pagination and Its Detailed Implementation

## Preface

When building Web applications, we often need to deal with a large amount of data. To improve user experience and application performance, we usually adopt pagination technology, dividing data into multiple pages, each page containing a portion of the data. This way, users can load and view data as needed, instead of loading all data at once, which is especially important for applications with large amounts of data.

Previously, I used graphql to build a simple backend management system, and then I saw on the official website that graphql recommends using cursor pagination to implement pagination. This is a method I have never used before, so it instantly sparked my interest.

Then I did a simple technical research and understood the differences between cursor pagination and traditional pagination. I found that the pagination method based on cursor pagination is quite suitable for my project, so I started learning its specific implementation and started coding.

![](https://oss.justin3go.com/blogs/Pasted%20image%2020221207225815.png)
## Traditional Pagination

### Introduction

The traditional pagination method is based on the number of pages and the number of items per page. For example, if we have 100 items and display 10 items per page, then we have 10 pages. Users can get a specific page by specifying the page number. In technical implementation, we usually use `LIMIT` and `OFFSET` in SQL queries to get the data of a specific page.

![](https://oss.justin3go.com/blogs/%E4%BC%A0%E7%BB%9F%E5%88%86%E9%A1%B5.png)
### Pros and Cons

The advantages of traditional pagination mainly include two aspects:

1. **Easy to implement**: You only need to use `LIMIT` and `OFFSET` in SQL queries to implement it. This makes traditional pagination a quick and simple solution in many cases.
2. **User-friendly**: Users can directly jump to any page. This is very intuitive for users, and they can easily understand and use this pagination method.

Traditional pagination also has some disadvantages:

1. **Performance issues**: When `OFFSET` is large, the database needs to skip many rows, which may cause performance issues. This is because the database needs to find the position specified by `OFFSET` before getting the data, which may require traversing a large amount of data.
2. **Data consistency issues**: If new data is inserted while the user is browsing the page, the content of the same page may change. This may cause users to see duplicate data or miss some data.

These two problems are precisely why cursor pagination technology emerged.
## Cursor-based Pagination

### Introduction

Please note that this cursor is not the cursor in MySQL and the like, it can be simply understood as a mark, a token-like thing.

Cursor-based pagination is a new pagination method. It is not based on the number of pages, but based on the last item of the previous page. For example, if we have 100 items and display 10 items per page, then the first item on the second page is the next item of the last item on the first page. In technical implementation, we usually use `WHERE` and `LIMIT` in SQL queries and need to handle the cursor.

![](https://oss.justin3go.com/blogs/%E6%B8%B8%E6%A0%87%E5%88%86%E9%A1%B5.png)

For cursor pagination, you can refer to the specification specified in [this link](https://relay.dev/graphql/connections.htm)
### Pros and Cons

Since it is to solve the problems existing in traditional pagination, the advantages of cursor-based pagination are the solutions to the disadvantages of traditional pagination:

1. **Performance optimization**: No need to skip any rows, just start from the last item on the previous page. This means that the database only needs to process the actual required data, not all data specified by `OFFSET`.
2. **Data consistency**: Even if new data is inserted, it will not affect the pages that have been browsed. This is because each page's data is based on the last item on the previous page, not based on the number of pages.

But it is not all advantages, cursor pagination also has the following disadvantages:

1. **Complex implementation**: You need to use `WHERE` and `LIMIT` in SQL queries and need to handle the cursor. This makes the implementation of cursor-based pagination more complicated than traditional pagination.
2. **User experience**: Users cannot directly jump to any page. This may make users feel inconvenient to use, especially when they need to browse a large number of pages.

### Detailed Implementation

Here we take `nest.js+graphql` as an example, the main implementation is the following `paginate.ts` file:

#### page-info.ts

```ts
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class PageInfo {

    @Field({ nullable: true })
    startCursor: string;

    @Field({ nullable: true })
    endCursor: string;

    @Field()
    hasPreviousPage: boolean;

    @Field()
    hasNextPage: boolean;
}
```

#### paginate.ts

```ts
import { Logger } from '@nestjs/common';
import { PageInfo } from './page-info';
import { PaginationArgs } from './pagination.args';
import { SelectQueryBuilder, MoreThan, LessThan } from 'typeorm';

/**
 * Based on https://gist.github.com/VojtaSim/6b03466f1964a6c81a3dbf1f8cec8d5c
 */
export async function paginate<T>(
    query: SelectQueryBuilder<T>,
    paginationArgs: PaginationArgs,
    cursorColumn = 'id',
    defaultLimit = 25,
): Promise<any> {

    const logger = new Logger('Pagination');

    // pagination ordering
    query.orderBy({ [cursorColumn]: 'DESC' })

    const totalCountQuery = query.clone();

    // FORWARD pagination
    if (paginationArgs.first) {

        if (paginationArgs.after) {
            const offsetId = Number(Buffer.from(paginationArgs.after, 'base64').toString('ascii'));
            logger.verbose(`Paginate AfterID: ${offsetId}`);
            query.where({ [cursorColumn]: MoreThan(offsetId) });
        }

        const limit = paginationArgs.first ?? defaultLimit;

        query.take(limit)
    }

    // REVERSE pagination
    else if (paginationArgs.last && paginationArgs.before) {
        const offsetId = Number(Buffer.from(paginationArgs.before, 'base64').toString('ascii'));
        logger.verbose(`Paginate BeforeID: ${offsetId}`);

        const limit = paginationArgs.last ?? defaultLimit;

        query
            .where({ [cursorColumn]: LessThan(offsetId) })
            .take(limit);
    }


    const result = await query.getMany();


    const startCursorId: number = result.length > 0 ? result[0][cursorColumn] : null;
    const endCursorId: number = result.length > 0 ? result.slice(-1)[0][cursorColumn] : null;


    const beforeQuery = totalCountQuery.clone();

    const afterQuery = beforeQuery.clone();

    let countBefore = 0;
    let countAfter = 0;
    if (beforeQuery.expressionMap.wheres && beforeQuery.expressionMap.wheres.length) {
        countBefore = await beforeQuery
            .andWhere(`${cursorColumn} < :cursor`, { cursor: startCursorId })
            .getCount();
        countAfter = await afterQuery
            .andWhere(`${cursorColumn} > :cursor`, { cursor: endCursorId })
            .getCount();

    } else {
        countBefore = await beforeQuery
            .where(`${cursorColumn} < :cursor`, { cursor: startCursorId })
            .getCount();

        countAfter = await afterQuery
            .where(`${cursorColumn} > :cursor`, { cursor: endCursorId })
            .getCount();

    }

    logger.debug(`CountBefore:${countBefore}`);
    logger.debug(`CountAfter:${countAfter}`);

    const edges = result.map((value) => {
        return {
            node: value,
            cursor: Buffer.from(`${value[cursorColumn]}`).toString('base64'),
        };
    });

    const pageInfo = new PageInfo();
    pageInfo.startCursor = edges.length > 0 ? edges[0].cursor : null;
    pageInfo.endCursor = edges.length > 0 ? edges.slice(-1)[0].cursor : null;

    pageInfo.hasNextPage = countAfter > 0;
    pageInfo.hasPreviousPage = countBefore > 0;
    // pageInfo.countBefore = countBefore;
    // pageInfo.countNext = countAfter;
    // pageInfo.countCurrent = edges.length;
    // pageInfo.countTotal = countAfter + countBefore + edges.length;

    return { edges, pageInfo };
}
```

#### paginated-post.ts

```ts
/**
 * Example of paginated graphql model
 */
import { Post } from "../models/post.model";
import { ObjectType } from '@nestjs/graphql';
import { Paginated } from "src/shared/pagination/types/paginated";

@ObjectType()
export class PaginatedPost extends Paginated(Post) { }
```

#### paginated.ts

```ts
import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info';


/**
 * Based on https://docs.nestjs.com/graphql/resolvers#generics
 * 
 * @param classRef 
 */
export function Paginated<T>(classRef: Type<T>): any {
    @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
    abstract class EdgeType {
        @Field(() => String)
        cursor: string;

        @Field(() => classRef)
        node: T;
    }

    @ObjectType({ isAbstract: true })
    abstract class PaginatedType {
        @Field(() => [EdgeType], { nullable: true })
        edges: EdgeType[];

        @Field(() => PageInfo, { nullable: true })
        pageInfo: PageInfo;
    }
    return PaginatedType;
}
```

#### pagination.args.ts

```ts
import { ArgsType, Int, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {

    @Field(() => Int, { nullable: true })
    first: number;

    @Field(() => String, { nullable: true })
    after: string;

    @Field(() => Int, { nullable: true })
    last: number;

    @Field(() => String, { nullable: true })
    before: string;

}
```

#### post-resolver.ts

```ts
import { Post } from "../models/post.model";
import { PostService } from '../providers/post.service';

@Resolver(() => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) { }

    @Query(() => PaginatedPost)
    getPosts(
        @Args() pagination: PaginationArgs,
        @Args() filter: PostFilter,
    ): Promise<PaginatedPost> {
        return this.postService.getPaginatedPosts(pagination, filter);
    }
}
```

#### post.service.ts

```ts
import { paginate } from './paginate';

@Injectable()
export class PostService {

    private readonly logger = new Logger('PostService');

    constructor(
        @InjectRepository(PostRepository)
        private postRepository: PostRepository,
    ) { }

    async getPaginatedPosts(paginationArgs: PaginationArgs, filter: PostFilter): Promise<PaginatedPost> {

        const query = await this.postRepository
            .createQueryBuilder()
            .select();
      
       // todo... you can apply filters here to the query as where clauses

        return paginate(query, paginationArgs);
    }
}
```

Parts of the above code refer to [this link](https://gist.github.com/tumainimosha/6652deb0aea172f7f2c4b2077c72d16c)

## In the End

Whether to choose cursor pagination depends on the specific business requirements. For example, if the PC side needs a pagination component and users can click on any page, then cursor pagination naturally cannot be used, but if the mobile side has infinite scrolling, cursor pagination can be used.