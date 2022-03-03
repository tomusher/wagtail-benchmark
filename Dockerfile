FROM python:3.9

ENV PYTHONUNBUFFERED 1

RUN apt-get update -y \
    && apt-get install -y libenchant-2-dev postgresql-client \
    && mkdir -p /code/requirements

# Install the bakerydemo project's dependencies into the image.
COPY ./bakerydemo/requirements/* /code/requirements/
RUN pip install --upgrade pip \
    && pip install -r /code/requirements/production.txt

COPY ./wagtail /code/wagtail/
RUN cd /code/wagtail/ \
    && pip install -e .[testing,docs]
