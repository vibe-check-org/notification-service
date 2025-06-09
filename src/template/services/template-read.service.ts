import { Model } from 'mongoose';
import { getLogger } from '../../logger/logger.js';
import { Template, TemplateDocument } from '../models/entities/template.schema.js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

//TODO Validationen fehlen ...
@Injectable()
export class TemplateReadService {
    readonly #logger = getLogger(TemplateReadService.name);
    readonly #templateModel: Model<TemplateDocument>

    constructor(
        @InjectModel(Template.name) templateModel: Model<TemplateDocument>,
    ) {
        this.#templateModel = templateModel;
    }

    /**
   * Findet eine Vorlage anhand ihrer eindeutigen ID.
   * @param id Die ID der Nachrichtenvorlage
   */
    async findById(id: string): Promise<Template | null> {
        this.#logger.debug('findById: id=%s', id);

        return this.#templateModel.findById(id).exec();
    }

    /**
     * Findet eine Vorlage anhand ihres Typs (z. B. USER_REGISTERED).
     * @param type Der Template-Typ
     */
    async findByType(type: string): Promise<Template | null> {
        return this.#templateModel.findOne({ type }).exec();
    }

    /**
     * Gibt alle gespeicherten Templates zurück.
     */
    async findAll(): Promise<Template[]> {
        return this.#templateModel.find().exec();
    }

    /**
 * Findet eine Vorlage anhand ihres Schlüssels (z. B. "welcome.user").
 * @param key Der Template-Key
 */
    async findByKey(key: string): Promise<Template | null> {
        this.#logger.debug('findByKey: key=%s', key);
        return this.#templateModel.findOne({ key }).exec();
    }

}
