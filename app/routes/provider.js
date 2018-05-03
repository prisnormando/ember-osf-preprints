/*eslint no-console: ["error", { allow: ["error"] }] */

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from 'ember-get-config';

/**
 * @module ember-preprints
 * @submodule routes
 */

/**
 * @class Provider Route Handler
 */
export default Route.extend({
    theme: service(),

    beforeModel(transition) {
        const {slug = ''} = transition.params.provider;
        const slugLower = slug.toLowerCase();

        return this.get('store').findRecord(
            'preprint-provider',
            slugLower
        ).then(() => {
            const {pathname} = window.location;
            const pathRegex = new RegExp(`^/preprints/${slug}`);

            if (slug !== slugLower) {
                window.location.pathname = pathname.replace(
                    pathRegex,
                    `/preprints/${slugLower}`
                );
            }
            this.set('theme.id', slugLower);
        }).catch(() => {
            this.set('theme.id', config.PREPRINTS.defaultProvider);

            if (slug.length === 5) {
                this.transitionTo('content', slug);
            } else {
                this.replaceWith('page-not-found');
            }
        });
    },

    actions: {
        error(error) {
            console.error(error);
            return true;
        }
    }
});
