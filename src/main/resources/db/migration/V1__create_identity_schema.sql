CREATE TABLE users (
    id UUID NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT uk_users_email UNIQUE (email)
);

CREATE TABLE roles (
    name VARCHAR(50) NOT NULL,
    CONSTRAINT pk_roles PRIMARY KEY (name)
);

CREATE TABLE permissions (
    name VARCHAR(50) NOT NULL,
    CONSTRAINT pk_permissions PRIMARY KEY (name)
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL,
    role_name VARCHAR(50) NOT NULL,
    CONSTRAINT pk_user_roles PRIMARY KEY (user_id, role_name),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_name) REFERENCES roles (name)
);

CREATE TABLE role_permissions (
    role_name VARCHAR(50) NOT NULL,
    permission_name VARCHAR(50) NOT NULL,
    CONSTRAINT pk_role_permissions PRIMARY KEY (role_name, permission_name),
    CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_name) REFERENCES roles (name) ON DELETE CASCADE,
    CONSTRAINT fk_role_permissions_permission FOREIGN KEY (permission_name) REFERENCES permissions (name)
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_user_roles_role ON user_roles (role_name);

INSERT INTO roles (name) VALUES ('ROLE_USER');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');

INSERT INTO permissions (name) VALUES ('PROFILE_READ');
INSERT INTO permissions (name) VALUES ('PROFILE_WRITE');
INSERT INTO permissions (name) VALUES ('USER_READ');
INSERT INTO permissions (name) VALUES ('USER_WRITE');
INSERT INTO permissions (name) VALUES ('ROLE_MANAGE');

INSERT INTO role_permissions (role_name, permission_name) VALUES ('ROLE_USER', 'PROFILE_READ');
INSERT INTO role_permissions (role_name, permission_name) VALUES ('ROLE_USER', 'PROFILE_WRITE');
INSERT INTO role_permissions (role_name, permission_name) VALUES ('ROLE_ADMIN', 'PROFILE_READ');
INSERT INTO role_permissions (role_name, permission_name) VALUES ('ROLE_ADMIN', 'PROFILE_WRITE');
INSERT INTO role_permissions (role_name, permission_name) VALUES ('ROLE_ADMIN', 'USER_READ');
INSERT INTO role_permissions (role_name, permission_name) VALUES ('ROLE_ADMIN', 'USER_WRITE');
INSERT INTO role_permissions (role_name, permission_name) VALUES ('ROLE_ADMIN', 'ROLE_MANAGE');
