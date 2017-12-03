export interface DbModel {
    id: string;
}

export interface CreatedAt {
    createdAt: Date;
}

export const DefineId = <T>(model: T, id: string): T => {
    Object.defineProperty(model, 'id', {
        value: id,
        enumerable: false,
    });

    return model;
};
