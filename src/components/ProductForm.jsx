import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addProduct } from '../services/productService';

const ProductForm = () => {
    const initialValues = {
        name: '',
        type: '',
        joursFlo: '',
        photo: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Le nom est requis'),
        type: Yup.string().required('Le type de la plante est requis'),
        joursFlo: Yup.number().required('Le nombre de jours de flo est requis').positive('Le nombre de jours doit être positif'),
        photo: Yup.string(),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            await addProduct(values);
            alert('Produit ajouté avec succès');
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Ajouter une nouvelle variété</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor='name'>Nom de la variété</label>
                            <Field name="name" type="text" />
                            <ErrorMessage name="name" component="div" />
                        </div>
                        <div>
                            <label htmlFor='type'>Type de weed</label>
                            <Field name="type" type="text" />
                            <ErrorMessage name="type" component="div" />
                        </div>
                        <div>
                            <label htmlFor='joursFlo'>Nombre de jours de floraison</label>
                            <Field name="joursFlo" type="number" />
                            <ErrorMessage name="joursFlo" component="div" />
                        </div>
                        <div>
                            <label htmlFor='photo'>Photo de la plante</label>
                            <Field name="photo" type="text" />
                            <ErrorMessage name="photo" component="div" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>Ajouter</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProductForm;