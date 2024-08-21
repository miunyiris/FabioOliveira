import { Request, Response } from 'express';
import { connectDB } from '../database';
import { Resource } from '../models/Resource';

export const createResource = async (req: Request, res: Response) => {
    const db = await connectDB();
    const { name, description } = req.body;

    const result = await db.run(
        'INSERT INTO resources (name, description) VALUES (?, ?)',
        [name, description]
    );

    const newResource: Resource = {
        id: result.lastID,
        name,
        description,
    };

    res.status(201).json(newResource);
};

export const listResources = async (req: Request, res: Response) => {
    const db = await connectDB();
    const resources: Resource[] = await db.all('SELECT * FROM resources');
    res.json(resources);
};

export const getResource = async (req: Request, res: Response) => {
    const db = await connectDB();
    const { id } = req.params;
    const resource: Resource | undefined = await db.get('SELECT * FROM resources WHERE id = ?', [id]);

    if (resource) {
        res.json(resource);
    } else {
        res.status(404).json({ message: 'Resource not found' });
    }
};

export const updateResource = async (req: Request, res: Response) => {
    const db = await connectDB();
    const { id } = req.params;
    const { name, description } = req.body;

    const result = await db.run(
        'UPDATE resources SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
    );

    if (result.changes !== undefined && result.changes > 0) {
        res.json({ id, name, description });
    } else {
        res.status(404).json({ message: 'Resource not found' });
    }
};

export const deleteResource = async (req: Request, res: Response) => {
    const db = await connectDB();
    const { id } = req.params;

    const result = await db.run('DELETE FROM resources WHERE id = ?', [id]);

    if (result.changes !== undefined && result.changes > 0) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Resource not found' });
    }
};