import { Model } from 'mongoose';
import { Template, TemplateDocument } from '../models/entities/template.schema.js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

//TODO Validationen fehlen ...
@Injectable()
export class TemplateWriteService {
    // readonly #logger = getLogger(NotificationWriteService.name);
    // readonly #consumerService: ConsumerService;
    readonly #templateModel: Model<TemplateDocument>

    constructor(
        @InjectModel(Template.name) templateModel: Model<TemplateDocument>,
        // consumerService: ConsumerService,
    ) {
        // this.#consumerService = consumerService;
        this.#templateModel = templateModel;
    }

    /**
   * Erstellt eine neue Nachrichtenvorlage in der Datenbank.
   * @param data Die Daten der neuen Vorlage
   */
    async createTemplate(data: Partial<Template>): Promise<Template> {
        const created = new this.#templateModel(data);
        return created.save();
    }

    /**
   * Aktualisiert eine bestehende Vorlage anhand ihrer ID.
   * @param id ID der Vorlage
   * @param update Neue Daten der Vorlage
   */
    async updateTemplate(
        id: string,
        update: Partial<Template>,
    ): Promise<Template | null> {
        return this.#templateModel.findByIdAndUpdate(id, update, { new: true });
    }

    /**
   * Löscht eine Vorlage aus der Datenbank.
   * @param id ID der Vorlage
   */
    async deleteTemplate(id: string): Promise<Template | null> {
        return this.#templateModel.findByIdAndDelete(id);
    }
}
