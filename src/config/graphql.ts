/**
 * @constant GRAPHQL_SCHEMA
 *
 * @description
 * Eine Umgebungsvariable, die bestimmt, wie das GraphQL-Schema geladen wird.
 *
 * - `true`: Aktiviert die Verwendung mehrerer GraphQL-Schemas.
 * - `false` (Standard): Verwendet ein einzelnes zentrales Schema.
 *
 * @default
 * `false`
 *
 * @example
 * ```env
 * GRAPHQL_SCHEMA=true  // Nutzt mehrere GraphQL-Schemas.
 * GRAPHQL_SCHEMA=false // Nutzt ein einziges GraphQL-Schema.
 * ```
 */
import { ApolloDriver, ApolloFederationDriver, ApolloFederationDriverConfig, type ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';


/**
 * Das Konfigurationsobjekt für GraphQL (siehe src\app.module.ts).
 */
export const graphQlModuleOptions: ApolloDriverConfig = {
    autoSchemaFile: join(process.cwd(), 'dist/schema.gql'),
    sortSchema: true,
    introspection: true,

    /**
     * Alternativer GraphQL-Treiber:
     * Für bessere Performance könnte Mercurius verwendet werden, der auf Fastify basiert.
     */
    driver: ApolloDriver,

    /**
     * Deaktiviert das Playground-Tool in der Produktionsumgebung.
     * Zum Testen kann es durch `playground: true` aktiviert werden.
     */
    playground: false,

    /**
     * Aktiviert den Playground und Debug-Modus basierend auf der Umgebung.
     */
    // playground: process.env.NODE_ENV !== 'orderion',
    // debug: process.env.NODE_ENV !== 'orderion',
};

export const graphQlModuleOptions2: ApolloFederationDriverConfig = {
    // autoSchemaFile: join(process.cwd(), 'dist/schema.gql'),
    autoSchemaFile: { path: "schema.gql", federation: 2 },
    driver: ApolloFederationDriver,
    playground: false,
};

