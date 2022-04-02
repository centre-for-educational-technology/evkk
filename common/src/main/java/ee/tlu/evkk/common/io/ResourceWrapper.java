package ee.tlu.evkk.common.io;

import org.springframework.core.io.Resource;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.nio.channels.ReadableByteChannel;
import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 25.02.2020
 */
public class ResourceWrapper implements Resource {

  private final Resource delegate;

  public ResourceWrapper(@Nonnull Resource delegate) {
    Objects.requireNonNull(delegate, "delegate must not be null");
    this.delegate = delegate;
  }

  /**
   * Returns underlying {@link Resource}
   *
   * @return original wrapped resource
   */
  @Nonnull
  public Resource getDelegate() {
    return delegate;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean exists() {
    return getDelegate().exists();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isReadable() {
    return getDelegate().isReadable();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isOpen() {
    return getDelegate().isOpen();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isFile() {
    return getDelegate().isFile();
  }

  /**
   * {@inheritDoc}
   */
  @Nonnull
  @Override
  public URL getURL() throws IOException {
    return getDelegate().getURL();
  }

  /**
   * {@inheritDoc}
   */
  @Nonnull
  @Override
  public URI getURI() throws IOException {
    return getDelegate().getURI();
  }

  /**
   * {@inheritDoc}
   */
  @Nonnull
  @Override
  public File getFile() throws IOException {
    return getDelegate().getFile();
  }

  /**
   * {@inheritDoc}
   */
  @Nonnull
  @Override
  public ReadableByteChannel readableChannel() throws IOException {
    return getDelegate().readableChannel();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public long contentLength() throws IOException {
    return getDelegate().contentLength();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public long lastModified() throws IOException {
    return getDelegate().lastModified();
  }

  /**
   * {@inheritDoc}
   */
  @Nonnull
  @Override
  public Resource createRelative(@Nonnull String relativePath) throws IOException {
    return getDelegate().createRelative(relativePath);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Nullable
  public String getFilename() {
    return getDelegate().getFilename();
  }

  /**
   * {@inheritDoc}
   */
  @Nonnull
  @Override
  public String getDescription() {
    return "Wrapped resource [" + getClass().getName() + "]: " + getDelegate().getDescription();
  }

  /**
   * {@inheritDoc}
   */
  @Nonnull
  @Override
  public InputStream getInputStream() throws IOException {
    return getDelegate().getInputStream();
  }

  @Override
  public String toString() {
    return getDescription();
  }

  @Override
  public boolean equals(Object other) {
    if (this == other) return true;
    if (other == null || getClass() != other.getClass()) return false;
    ResourceWrapper that = (ResourceWrapper) other;
    return Objects.equals(delegate, that.delegate);
  }

  @Override
  public int hashCode() {
    return Objects.hash(delegate);
  }

}
