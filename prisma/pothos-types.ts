/* eslint-disable */
import type { Prisma, Account, Session, User, VerificationToken, Word, Group, Text, Test } from "@prisma/client";
export default interface PrismaTypes {
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        OrderBy: Prisma.AccountOrderByWithRelationInput;
        WhereUnique: Prisma.AccountWhereUniqueInput;
        Where: Prisma.AccountWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "accounts" | "sessions" | "english" | "russian" | "spelling" | "auding" | "speaking";
        ListRelations: "accounts" | "sessions" | "english" | "russian" | "spelling" | "auding" | "speaking";
        Relations: {
            accounts: {
                Shape: Account[];
                Name: "Account";
            };
            sessions: {
                Shape: Session[];
                Name: "Session";
            };
            english: {
                Shape: Word[];
                Name: "Word";
            };
            russian: {
                Shape: Word[];
                Name: "Word";
            };
            spelling: {
                Shape: Word[];
                Name: "Word";
            };
            auding: {
                Shape: Word[];
                Name: "Word";
            };
            speaking: {
                Shape: Word[];
                Name: "Word";
            };
        };
    };
    VerificationToken: {
        Name: "VerificationToken";
        Shape: VerificationToken;
        Include: never;
        Select: Prisma.VerificationTokenSelect;
        OrderBy: Prisma.VerificationTokenOrderByWithRelationInput;
        WhereUnique: Prisma.VerificationTokenWhereUniqueInput;
        Where: Prisma.VerificationTokenWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Word: {
        Name: "Word";
        Shape: Word;
        Include: Prisma.WordInclude;
        Select: Prisma.WordSelect;
        OrderBy: Prisma.WordOrderByWithRelationInput;
        WhereUnique: Prisma.WordWhereUniqueInput;
        Where: Prisma.WordWhereInput;
        Create: {};
        Update: {};
        RelationName: "english" | "russian" | "spelling" | "auding" | "speaking" | "groups";
        ListRelations: "english" | "russian" | "spelling" | "auding" | "speaking" | "groups";
        Relations: {
            english: {
                Shape: User[];
                Name: "User";
            };
            russian: {
                Shape: User[];
                Name: "User";
            };
            spelling: {
                Shape: User[];
                Name: "User";
            };
            auding: {
                Shape: User[];
                Name: "User";
            };
            speaking: {
                Shape: User[];
                Name: "User";
            };
            groups: {
                Shape: Group[];
                Name: "Group";
            };
        };
    };
    Group: {
        Name: "Group";
        Shape: Group;
        Include: Prisma.GroupInclude;
        Select: Prisma.GroupSelect;
        OrderBy: Prisma.GroupOrderByWithRelationInput;
        WhereUnique: Prisma.GroupWhereUniqueInput;
        Where: Prisma.GroupWhereInput;
        Create: {};
        Update: {};
        RelationName: "words" | "text_id";
        ListRelations: "words";
        Relations: {
            words: {
                Shape: Word[];
                Name: "Word";
            };
            text_id: {
                Shape: Text | null;
                Name: "Text";
            };
        };
    };
    Text: {
        Name: "Text";
        Shape: Text;
        Include: Prisma.TextInclude;
        Select: Prisma.TextSelect;
        OrderBy: Prisma.TextOrderByWithRelationInput;
        WhereUnique: Prisma.TextWhereUniqueInput;
        Where: Prisma.TextWhereInput;
        Create: {};
        Update: {};
        RelationName: "group";
        ListRelations: never;
        Relations: {
            group: {
                Shape: Group;
                Name: "Group";
            };
        };
    };
    Test: {
        Name: "Test";
        Shape: Test;
        Include: never;
        Select: Prisma.TestSelect;
        OrderBy: Prisma.TestOrderByWithRelationInput;
        WhereUnique: Prisma.TestWhereUniqueInput;
        Where: Prisma.TestWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}