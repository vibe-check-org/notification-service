import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TemplateWriteService } from '../services/template-write.service.js';
import { CreateTemplateInput } from '../models/input/create-template.input.js';
import { UpdateTemplateInput } from '../models/input/update-template.input.js';
import { Roles } from 'nest-keycloak-connect';
import { Template } from '../models/entities/template.schema.js';

/**
 * GraphQL-Resolver für Nachrichtenvorlagen (Templates).
 * Bietet Mutationen zum Erstellen, Bearbeiten und Löschen sowie Queries zum Abrufen.
 */
@Resolver(() => Template)
export class TemplateMutationResolver {
    readonly #templateWriteService: TemplateWriteService;

    constructor(
        templateWriteService: TemplateWriteService,
    ) {
        this.#templateWriteService = templateWriteService;
    }

    /**
     * Erstellt eine neue Nachrichtenvorlage.
     */
    @Mutation(() => Template)
    @Roles({ roles: ['Admin', 'User'] })
    async createTemplate(
        @Args('input') input: CreateTemplateInput,
    ): Promise<Template> {
        return this.#templateWriteService.createTemplate(input);
    }

    /**
     * Aktualisiert eine bestehende Vorlage anhand der ID.
     */
    @Mutation(() => Template)
    @Roles({ roles: ['Admin', 'User'] })
    async updateTemplate(
        @Args('id') id: string,
        @Args('input') input: UpdateTemplateInput,
    ): Promise<Template | null> {
        return this.#templateWriteService.updateTemplate(id, input);
    }

    /**
     * Löscht eine Vorlage anhand der ID.
     */
    @Mutation(() => Boolean)
    @Roles({ roles: ['Admin', 'User'] })
    async deleteTemplate(@Args('id') id: string): Promise<boolean> {
        const deleted = await this.#templateWriteService.deleteTemplate(id);
        return !!deleted;
    }
}
