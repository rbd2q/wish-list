import * as yup from 'yup';

import { CollectionColor, CollectionIcon } from '@/entities/collection';

import { COLLECTION_FORM_CONFIG } from '../config';

export const collectionSchema = yup.object({
  name: yup
    .string()
    .trim()
    .max(COLLECTION_FORM_CONFIG.nameMaxLength, 'Use up to ${max} characters')
    .required('Enter a collection name'),
  description: yup
    .string()
    .trim()
    .max(COLLECTION_FORM_CONFIG.descriptionMaxLength, 'Use up to ${max} characters')
    .defined(),
  icon: yup.mixed<CollectionIcon>().oneOf(Object.values(CollectionIcon)).required('Choose an icon'),
  color: yup.mixed<CollectionColor>().oneOf(Object.values(CollectionColor)).required('Choose a color'),
});
