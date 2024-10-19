const globalErrorHanlder = (err, req, res, next)=>{
    const status = err?.status ? err?.status : 'failed';

    const message = err?.message;

    const stack = err?.stack;

    res.status(500).json({
        status,
        message, stack
    });
};

// not found handler

const notFound = (req, res, next) => {
    const err = new Error(`Nem található a ${req.originalUrl} a szerveren`);
    next(err);
};

module.exports = {notFound, globalErrorHanlder};