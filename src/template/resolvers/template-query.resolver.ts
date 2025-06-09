import { Resolver, Args, Query } from '@nestjs/graphql';
import { TemplateReadService } from '../services/template-read.service.js';
import { Roles } from 'nest-keycloak-connect';
import { Template } from '../models/entities/template.schema.js';

/**
 * GraphQL-Resolver für Nachrichtenvorlagen (Templates).
 * Bietet Mutationen zum Erstellen, Bearbeiten und Löschen sowie Queries zum Abrufen.
 */
@Resolver(() => Template)
export class TemplateQueryResolver {
    readonly #templateReadService: TemplateReadService;

    constructor(
        templateReadService: TemplateReadService,
    ) {
        this.#templateReadService = templateReadService;
    }

    /**
     * Gibt alle gespeicherten Vorlagen zurück.
     */
    @Query(() => [Template])
    @Roles({ roles: ['Admin', 'User'] })
    async getAllTemplates(): Promise<Template[]> {
        return this.#templateReadService.findAll();
    }

    /**
     * Gibt eine Vorlage anhand ihres Typs zurück.
     */
    @Query(() => Template, { nullable: true })
    @Roles({ roles: ['Admin', 'User'] })
    async getTemplateByType(@Args('type') type: string): Promise<Template | null> {
        return this.#templateReadService.findByType(type);
    }

    @Query(() => Template, { nullable: true })
    @Roles({ roles: ['Admin', 'User'] })
    getTemplateByKey(@Args('key') key: string): Promise<Template | null> {
        return this.#templateReadService.findByKey(key);
    }

}
