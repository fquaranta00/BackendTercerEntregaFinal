import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query, available } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
      customLabels: {
        docs: 'payload',
        totalDocs: 'totalProducts',
        totalPages: 'totalPages',
        page: 'page',
        nextPage: 'nextPage',
        prevPage: 'prevPage',
        hasNextPage: 'hasNextPage',
        hasPrevPage: 'hasPrevPage',
        prevLink: 'prevLink',
        nextLink: 'nextLink'
      }
    };

    const matchCriteria = {};
    if (query) {
      matchCriteria.category = query;
    }
    if (available) {
      matchCriteria.status = available === 'true' ? true : false;
    }

    const products = await ProductController.paginate(matchCriteria, options);

    const buildResponse = (data) => {
      return {
        status: 'success',
        payload: data.payload.map(product => product.toJSON()),
        totalProducts: data.totalProducts,
        limit: data.limit,
        totalPages: data.totalPages,
        page: data.page,
        pagingCounter: data.pagingCounter,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `http://localhost:8080/views/products?limit=${data.limit}&page=${data.prevPage}` : '',
        nextLink: data.hasNextPage ? `http://localhost:8080/views/products?limit=${data.limit}&page=${data.nextPage}` : '',
      };
    };

    res.render('products', { ...buildResponse(products) });

  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductController.getById(pid);
    res.render('productDetails', { product: product.toJSON() });

  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

export default router;
