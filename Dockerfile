FROM node:carbon-alpine

LABEL maintainer="Felix Fennell <felnne@bas.ac.uk>"

# Setup project
WORKDIR /usr/src/app

# Setup project dependencies
COPY package.json /usr/src/app
RUN npm install --global yarn && yarn install

# Run tests
RUN echo "node version: " && node --version && \
    echo "npm version: " && npm --version && \
    echo "yarn version: " && yarn --version && \
    echo "gulp version: " && ./node_modules/gulp/bin/gulp.js --version

# Setup runtime
ENTRYPOINT ["./node_modules/gulp/bin/gulp.js"]
CMD ["--tasks-simple"]
