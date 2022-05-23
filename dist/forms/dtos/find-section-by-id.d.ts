import { Section } from '../schemas/section.schema';
import { CoreOutput } from '../../common/dtos/output.dto';
export declare class FindSectionByIdInput {
    sectionId: string;
}
export declare class FindSectionByIdOutput extends CoreOutput {
    section?: Section;
}
