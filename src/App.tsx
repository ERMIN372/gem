import { FormEvent, useMemo, useState } from 'react';

type CategoryValue = 'melee' | 'fancy' | 'sapphires' | 'custom request';

type ContactFormState = {
  name: string;
  company: string;
  contact: string;
  category: CategoryValue;
  comment: string;
};

const categoryOptions: Array<{ value: CategoryValue; label: string }> = [
  { value: 'melee', label: 'melee' },
  { value: 'fancy', label: 'fancy' },
  { value: 'sapphires', label: 'sapphires' },
  { value: 'custom request', label: 'custom request' },
];

const initialFormState: ContactFormState = {
  name: '',
  company: '',
  contact: '',
  category: 'melee',
  comment: '',
};

function App() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('Запрос preview по натуральным камням');
    const body = encodeURIComponent(
      [
        `Имя: ${form.name || '-'}`,
        `Компания: ${form.company || '-'}`,
        `Telegram/WhatsApp: ${form.contact || '-'}`,
        `Категория: ${form.category}`,
        `Комментарий: ${form.comment || '-'}`,
      ].join('\n'),
    );

    return `mailto:info@example.com?subject=${subject}&body=${body}`;
  }, [form]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailtoHref;
  };

  return (
    <div className="page">
      <main className="container">
        <section className="hero">
          <p className="eyebrow">B2B-витрина натуральных камней</p>
          <h1>Натуральные камни для ювелирных проектов</h1>
          <p className="hero-subtitle">
            Мелкие белые бриллианты для паве и инкрустации, fancy stones 2–4 ct и сапфиры под
            центральные вставки. Закрытый preview по запросу.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Запросить preview
            </a>
            <a className="button button-ghost" href="https://t.me/your_telegram" target="_blank" rel="noreferrer">
              Написать в Telegram
            </a>
          </div>
        </section>

        <section>
          <h2>Категории</h2>
          <div className="grid grid-3">
            <article className="card">
              <h3>Мелкие белые бриллианты</h3>
              <p>
                Для паве, дорожек, инкрустации часов, гриллз, подвесов и кастомных изделий.
              </p>
            </article>
            <article className="card">
              <h3>Fancy stones 2–4 ct</h3>
              <p>
                Для центральных вставок, private orders и визуально выразительных ювелирных
                проектов.
              </p>
            </article>
            <article className="card">
              <h3>Сапфиры</h3>
              <p>
                Для колец, подвесов, серёг и центральных вставок. Параметры и документы по
                запросу.
              </p>
            </article>
          </div>
        </section>

        <section>
          <h2>Формат работы</h2>
          <ul className="list">
            <li>Закрытый каталог-витрина по запросу</li>
            <li>Фото и видео по позициям</li>
            <li>Характеристики камней</li>
            <li>Документы по части позиций</li>
            <li>Подбор под конкретный ювелирный проект</li>
            <li>B2B-коммуникация с ювелирами, ателье и закупщиками</li>
          </ul>
        </section>

        <section>
          <h2>Кому подойдёт</h2>
          <ul className="list list-grid">
            <li>Ювелирные мастерские</li>
            <li>Кастомные ателье</li>
            <li>Производители украшений</li>
            <li>Мастера по гриллзам</li>
            <li>Инкрустация часов</li>
            <li>Private orders</li>
          </ul>
        </section>

        <section>
          <h2>Как запросить preview</h2>
          <ol className="steps">
            <li>Вы указываете интересующую категорию</li>
            <li>Мы отправляем короткую подборку</li>
            <li>По интересным позициям направляем дополнительные фото, видео и документы</li>
          </ol>
        </section>

        <section id="contact" className="contact">
          <div>
            <h2>Контакты и запрос preview</h2>
            <p>
              Форма отправляет заявку через ваш почтовый клиент. Мы не публикуем полный каталог в
              открытом доступе.
            </p>
            <div className="contact-links">
              <a href="https://t.me/your_telegram" target="_blank" rel="noreferrer">
                Telegram: @your_telegram
              </a>
              <a href="https://wa.me/7XXXXXXXXXX" target="_blank" rel="noreferrer">
                WhatsApp: +7XXXXXXXXXX
              </a>
              <a href="mailto:info@example.com">Email: info@example.com</a>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <label>
              Имя
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                name="name"
                required
              />
            </label>
            <label>
              Компания
              <input
                value={form.company}
                onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                name="company"
              />
            </label>
            <label>
              Telegram или WhatsApp
              <input
                value={form.contact}
                onChange={(event) => setForm((prev) => ({ ...prev, contact: event.target.value }))}
                name="contact"
                required
              />
            </label>
            <label>
              Интересующая категория
              <select
                value={form.category}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, category: event.target.value as CategoryValue }))
                }
                name="category"
              >
                {categoryOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Комментарий
              <textarea
                value={form.comment}
                onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))}
                name="comment"
                rows={4}
              />
            </label>
            <button type="submit" className="button button-primary button-block">
              Открыть email для отправки
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
