

/**
 * If statment
 *
 * @method if
 * @memberof module:$r
 * @param expression
 *
 * @returns {$r}
 */
$r.assign('if', $func (function(expression, callback) {
    this.total = 1;
    this.count = 0;

    if(expression) {
        this.count++;
    }

    if(this.count == this.total && callback) {
        callback.call(this, this.el);
    }

    return this;
}));


/**
 * If statment
 *
 * @method elseif
 * @memberof module:$r
 * @param expression
 *
 * @returns {$r}
 */
$r.assign('elseif', $func (function(expression, callback) {
    if(this.count != 1) {
        if(expression) {
            this.count++;
            this.total = 0;
        }
    }

    this.total++;

    if(this.count == this.total && callback) {
        callback.call(this, this.el);
    }

    return this;
}));


/**
 * Execute else statment
 *
 * @method else
 * @memberof module:$r
 * @param callback
 *
 * @returns {$r}
 */
$r.assign('else', $func (function(callback) {
    if(this.count != 1) {
        this.count++;
        this.total = 1;
        callback.call(this, this.el);
    }

    this.total++;
    return this;
}));

/**
 * If statment
 *
 * @method when
 * @memberof module:$r
 * @param expression
 *
 * @returns {$r}
 */
$r.assign('when', $func (function(expression, callback) {
    this.total = 1;
    this.count = 0;

    expression =
        (typeof expression == 'function') ? expression.call(this) : expression;

    if(expression) {
        this.count++;
    }

    return this;
}));

/**
 * Execute if statment
 *
 * @method do
 * @memberof module:$r
 * @param callback
 *
 * @returns {$r}
 */
$r.assign('do', $func (function(callback) {
    if(this.count == this.total) {
        callback.call(this, this.el);
    }

    return this;
}));

/**
 * ELse if statment
 *
 * @method or
 * @memberof module:$r
 * @param expression
 *
 * @returns {$r}
 */
$r.assign('or', $func (function(expression, callback) {
    expression =
        (typeof expression == 'function') ? expression.call(this) : expression;

    if(this.count != 1) {
        if(expression) {
            this.count++;
            this.total = 0;
        }
    }

    this.total++;
    return this;
}));