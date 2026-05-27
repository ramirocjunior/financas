-- ============================================================
-- Finanças Pessoais — Schema do Supabase
-- Execute este SQL no Supabase SQL Editor
-- ============================================================

-- Habilita geração de UUID
create extension if not exists "pgcrypto";

-- ============================================================
-- Tabela de transações
-- ============================================================
create table public.transactions (
  id          uuid           primary key default gen_random_uuid(),
  user_id     uuid           not null references auth.users(id) on delete cascade,
  descricao   text           not null,
  valor       numeric(12, 2) not null check (valor > 0),
  data        date           not null,
  tipo        text           not null check (tipo in ('receita', 'despesa')),
  categoria   text           not null check (categoria in (
    'Alimentação','Transporte','Moradia','Lazer',
    'Saúde','Educação','Salário','Freelance','Outros'
  )),
  created_at  timestamptz    not null default now(),
  updated_at  timestamptz    not null default now()
);

-- ============================================================
-- Trigger para atualizar updated_at automaticamente
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_transactions_updated_at
  before update on public.transactions
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- Índices para os padrões de filtro mais comuns
-- ============================================================
create index idx_transactions_user_id   on public.transactions (user_id);
create index idx_transactions_data      on public.transactions (user_id, data desc);
create index idx_transactions_categoria on public.transactions (user_id, categoria);
create index idx_transactions_tipo      on public.transactions (user_id, tipo);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.transactions enable row level security;

-- Usuários veem apenas suas próprias transações
create policy "select_own_transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

-- Usuários inserem apenas para si mesmos
create policy "insert_own_transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

-- Usuários editam apenas suas próprias transações
create policy "update_own_transactions"
  on public.transactions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Usuários deletam apenas suas próprias transações
create policy "delete_own_transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);
